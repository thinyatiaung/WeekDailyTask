export function generateRandomId(value:any) {
    const characters = value;
    let result = '';
    for (let i = 0; i < 24; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }