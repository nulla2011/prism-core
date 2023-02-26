export default function is404(data: any) {
  if ((data as Buffer).toString().startsWith('<!doctype html>')) {
    return true;
  }
  return false;
}
