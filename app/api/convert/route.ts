import { NextResponse } from "next/server";

async function GET() {
    return NextResponse.json({ message: "test" }, { status: 200 });
}

export { GET }