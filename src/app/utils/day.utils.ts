export function secondsToTolcalTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  let result = '';
  if (hours > 0) {
    result += `${hours}:`;
  }

  if (minutes > 0 && hours > 0) {
    result += `${minutes} ชั่วโมง`;
  } else if (minutes > 0) {
    result += `${minutes} นาที`;
  }

  if (seconds > 0 && minutes === 0) {
    result += `${remainingSeconds} วินาที`;
  }
  return result.trim();
}
