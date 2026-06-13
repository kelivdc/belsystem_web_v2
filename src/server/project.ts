import { createServerFn } from "@tanstack/react-start";
import {
    getRequest,
    getRequestHeader,
    setResponseHeaders,
    setResponseStatus,
} from '@tanstack/react-start/server'

type GetUsersInput = {
    slug?: string;
};

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const API_URL = import.meta.env.VITE_API_URL;

export const getProject = createServerFn({ method: "GET" })
    .inputValidator((data: { slug: string }) => data)
    .handler(async ({ data }) => {
        const response = await fetch(
            `${API_URL}/projects?populate=*&filters[slug][$eq]=${data.slug}`,
            {
                cache: "no-store",
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`, // token from .env
                    "Content-Type": "application/json",
                },
            },
        );
        const result = await response.json();
        if (!result?.data || result.data.length === 0) {
            return null; // nanti di frontend bisa handle not found
        }
        return result;
    });


export const getCobain = createServerFn({ method: "GET" })
    .inputValidator((data: { slug: string }) => data)
    .handler(
        async ({ data }) => {

            return 'Sukses'
        }
    )