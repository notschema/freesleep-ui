export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5/9;
}

export function formatTemperature(celsius: number, useFahrenheit: boolean): string {
  if (useFahrenheit) {
    return `${celsiusToFahrenheit(celsius).toFixed(1)}°F`;
  }
  return `${celsius}°C`;
}

export function getTemperatureUnit(useFahrenheit: boolean): string {
  return useFahrenheit ? '°F' : '°C';
}

export function getTempMin(useFahrenheit: boolean): number {
  return useFahrenheit ? celsiusToFahrenheit(13) : 13;
}

export function getTempMax(useFahrenheit: boolean): number {
  return useFahrenheit ? celsiusToFahrenheit(43) : 43;
}

export function displayTemp(celsius: number, useFahrenheit: boolean): number {
  return useFahrenheit ? celsiusToFahrenheit(celsius) : celsius;
}
