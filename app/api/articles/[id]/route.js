import { NextResponse } from "next/server";

function getBackendBase() {
    return process.env.NEXT_PUBLIC_BASE_URL;
}

export async function GET(request, { params }) {
    const { id } = await Promise.resolve(params);
    const backendBase = getBackendBase();

    try {
        const backendUrl = new URL(backendBase);
        backendUrl.pathname = `${backendUrl.pathname.replace(/\/$/, "")}/${id}`;

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
                    error: `API Error: ${res.status} ${res.statusText}`,
                    data,
                },
                { status: res.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Proxy /api/articles/[id] GET failed:", error);
        return NextResponse.json(
            { error: "Failed to fetch article" },
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
    const { id } = await Promise.resolve(params);
    const backendBase = getBackendBase();

    try {
        const body = await request.json();

        const backendUrl = new URL(backendBase);
        backendUrl.pathname = `${backendUrl.pathname.replace(/\/$/, "")}/${id}`;

        const res = await fetch(backendUrl.toString(), {
            method: "PATCH",
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
        console.error("Proxy /api/articles/[id] PATCH failed:", error);
        return NextResponse.json(
            { error: "Failed to update article" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    const { id } = await Promise.resolve(params);
    const backendBase = getBackendBase();

    try {
        const backendUrl = new URL(backendBase);
        backendUrl.pathname = `${backendUrl.pathname.replace(/\/$/, "")}/${id}`;

        const res = await fetch(backendUrl.toString(), {
            method: "DELETE",
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
        console.error("Proxy /api/articles/[id] DELETE failed:", error);
        return NextResponse.json(
            { error: "Failed to delete article" },
            { status: 500 }
        );
    }
}

