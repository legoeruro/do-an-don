import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p>
        hello
      </p>
        <Link href='/schedules/1/edit'>
          Create a new schedule        
        </Link>
    </div>
  );
}
