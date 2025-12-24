import { NextResponse } from "next/server";

function getBackendBase() {
    return process.env.NEXT_PUBLIC_BASE_URL;
}

export async function GET(request, { params }) {
    const { id } = await Promise.resolve(params);
    const backendBase = getBackendBase();

    try {
        const backendUrl = new URL(backendBase);
        backendUrl.pathname = `${backendUrl.pathname.replace(/\/$/, "")}/${id}/comments`;

        const res = await fetch(backendUrl.toString(), { cache: "no-store" });

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
                    items: [],
                    error: `API Error: ${res.status} ${res.statusText}`,
                    data,
                },
                { status: res.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Proxy /api/articles/[id]/comments GET failed:", error);
        return NextResponse.json(
            { items: [], error: "Failed to fetch comments" },
            { status: 500 }
        );
    }
}

export async function POST(request, { params }) {
    const { id } = await Promise.resolve(params);
    const backendBase = getBackendBase();

    try {
        const body = await request.json();

        const backendUrl = new URL(backendBase);
        backendUrl.pathname = `${backendUrl.pathname.replace(/\/$/, "")}/${id}/comments`;

        const res = await fetch(backendUrl.toString(), {
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
        console.error("Proxy /api/articles/[id]/comments POST failed:", error);
        return NextResponse.json(
            { error: "Failed to create comment" },
            { status: 500 }
        );
    }
}



