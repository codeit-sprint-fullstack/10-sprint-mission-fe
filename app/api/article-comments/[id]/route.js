import { NextResponse } from "next/server";

function getBackendBase() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = new URL(baseUrl);
    return `${url.origin}/article-comments`;
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
        console.error("Proxy /api/article-comments/[id] PATCH failed:", error);
        return NextResponse.json(
            { error: "Failed to update comment" },
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
        console.error("Proxy /api/article-comments/[id] DELETE failed:", error);
        return NextResponse.json(
            { error: "Failed to delete comment" },
            { status: 500 }
        );
    }
}

