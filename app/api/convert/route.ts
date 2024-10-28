import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

async function GET(req: NextApiRequest, res: NextApiResponse) {
    return NextResponse.json({ message: "test" }, { status: 200 });
}

export { GET }