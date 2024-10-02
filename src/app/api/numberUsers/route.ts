// import { NextResponse } from 'next/server';

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const month = url.searchParams.get('month'); 

//     let apiUrl = `${process.env.BASE_URL}/api/users/register`;

//     if (month) {
//       apiUrl += `?month=${month}`;
//     }

//     const res = await fetch(apiUrl);
//     if (!res.ok) {
//       throw new Error('Failed to fetch number of users');
//     }
    
//     const data = await res.json();
//     return NextResponse.json(data, { status: 200 });
    
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/users/register`);
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}