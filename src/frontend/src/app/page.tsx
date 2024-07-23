'use client'
export default function Home() {
    const test = async () => {
        const res = await fetch('/api/srcBuild?q=client')
        const data = await res.json();
        console.log(data)
    }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={test}>生成</button>
    </main>
  );
}
