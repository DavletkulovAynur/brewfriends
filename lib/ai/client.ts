export function createAiClient() {
  return {
    async complete(_prompt: string): Promise<string> {
      return "";
    },
  };
}
