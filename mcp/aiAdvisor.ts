// Este archivo puede conectarse a una IA como OpenAI si lo deseas
export function generateSelectorSuggestion(selector: string, dom: string): string {
    // Simulación de sugerencia por IA (ejemplo básico)
    if (selector.includes('#')) {
      return selector.replace('#', '.'); // ejemplo simple
    }
    return selector;
  }
  