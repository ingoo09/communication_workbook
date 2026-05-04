import { Suspense } from 'react';
import Ch2Client from './Ch2Client';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Ch2Client />
    </Suspense>
  );
}