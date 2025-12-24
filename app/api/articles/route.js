import { NextResponse } from "next/server";

function getBackendBase() {
    return process.env.NEXT_PUBLIC_BASE_URL;
}

export async function GET(request) {
    const backendBase = getBackendBase();

    try {
        const backendUrl = new URL(backendBase);

        // query params 전달 (order, limit 등)
        for (const [key, value] of request.nextUrl.searchParams.entries()) {
            backendUrl.searchParams.set(key, value);
        }

        const res = await fetch(backendUrl.toString(), { cache: "no-store" });

        if (!res.ok) {
            return NextResponse.json(
                { items: [], error: `API Error: ${res.status} ${res.statusText}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Proxy /api/articles failed:", error);
        return NextResponse.json(
            { items: [], error: "Failed to fetch articles" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    const backendBase = getBackendBase();

    try {
        const body = await request.json();

        const res = await fetch(backendBase, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const text = await res.text();
        let data = null;
        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = text;
        }

        if (!res.ok) {
            return NextResponse.json(
                {
                    error: `API Error: ${res.status} ${res.statusText}`,
                    data,
                },
                { status: res.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Proxy /api/articles POST failed:", error);
        return NextResponse.json(
            { error: "Failed to create article" },
            { status: 500 }
        );
    }
}



