import fs from 'fs-extra';
import path from 'path';
import {
  Document, Packer, Paragraph, TextRun,
  ImageRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType
} from 'docx';

const allureResultsPath = './allure-results';
const outputPath = './Reporte_Automatizado_Final.docx';
const logoPath = './LOGO BSIDE OK.png';

const formatDateTime = (date: Date) => {
  const fecha = date.toLocaleDateString('es-MX');
  const hora = date.toLocaleTimeString('es-MX');
  return { fecha, hora };
};

(async () => {
  try {
    const files = await fs.readdir(allureResultsPath);
    const resultFiles = files.filter((f: string) => f.endsWith('-result.json'));
    if (resultFiles.length === 0) throw new Error('❌ No se encontraron archivos de resultados');

    // 🔍 Ordenar archivos por fecha de modificación (mtime)
    const sortedFiles = await Promise.all(
      resultFiles.map(async (file: string) => {
        const stat = await fs.stat(path.join(allureResultsPath, file));
        return { file, mtime: stat.mtime };
      })
    );
    sortedFiles.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    const latestFile = sortedFiles[0];
    const latestResult = await fs.readJSON(path.join(allureResultsPath, latestFile.file));

    const processedNames = new Set<string>();
    const allResults: any[] = [];

    for (const { file } of sortedFiles) {
      const content = await fs.readJSON(path.join(allureResultsPath, file));
      if (!processedNames.has(content.name)) {
        allResults.push(content);
        processedNames.add(content.name);
      }
    }

    const total = allResults.length;
    const passed = allResults.filter(r => r.status === 'passed').length;
    const failed = total - passed;

    const ownerLabel = latestResult.labels?.find((l: any) => l.name === 'owner');
    const testerName = ownerLabel?.value || 'No definido';

    const { fecha, hora } = formatDateTime(latestFile.mtime);

    const children: any[] = [];

    // ✅ Logo centrado
    if (await fs.pathExists(logoPath)) {
      const logoBuffer = await fs.readFile(logoPath);
      children.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: logoBuffer,
              transformation: { width: 200, height: 60 },
              type: 'png',
            }),
          ],
          alignment: 'center',
        })
      );
    } else {
      console.warn('⚠️ Logo no encontrado en ./LOGO BSIDE OK.png');
    }

    // ✅ Título
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'REPORTE DE RESULTADOS DE AUTOMATIZACIÓN',
            bold: true,
            size: 28,
          }),
        ],
        alignment: 'center',
        spacing: { after: 300 },
      })
    );

    // ✅ Tabla con resumen
    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('👤 Tester:')], width: { size: 30, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph(testerName)] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('📅 Fecha:')] }),
            new TableCell({ children: [new Paragraph(fecha)] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('🕒 Hora:')] }),
            new TableCell({ children: [new Paragraph(hora)] }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('✅ Total pruebas:')] }),
            new TableCell({ children: [new Paragraph(`${total} (${passed} Passed / ${failed} Failed)`)] }),
          ],
        }),
      ],
    });
    children.push(table);

    // Separador
    children.push(new Paragraph({ text: '------------------------------------------------------------', spacing: { after: 400 } }));

    // 🔍 Detalle por test
    for (const content of allResults) {
      const testName = content.name;
      const testStatus = content.status;

      children.push(
        new Paragraph({
          text: `${testStatus === 'passed' ? '🟢' : '🔴'} ${testName}`,
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 300 },
        })
      );

      for (const step of content.steps || []) {
        if (!/^\d\d\s*-\s*/.test(step.name)) continue;

        children.push(new Paragraph({ text: `➡️ ${step.name}`, spacing: { after: 200 } }));

        const matchingSubStep = (step.steps || []).find(
          (s: any) => s.attachments && s.attachments.length > 0
        );

        if (matchingSubStep) {
          for (const att of matchingSubStep.attachments) {
            const fullPath = path.resolve(allureResultsPath, att.source);
            if (await fs.pathExists(fullPath)) {
              const buffer = await fs.readFile(fullPath);
              children.push(
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: buffer,
                      transformation: { width: 500, height: 300 },
                      type: 'png',
                    }),
                  ],
                  spacing: { after: 300 },
                })
              );
            }
          }
        }
      }

      children.push(new Paragraph({ text: '------------------------------------------------------------', spacing: { after: 400 } }));
    }

    const doc = new Document({ sections: [{ children }] });
    const buffer = await Packer.toBuffer(doc);
    await fs.writeFile(outputPath, buffer);
    console.log(`✅ Reporte final generado: ${outputPath}`);
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();
