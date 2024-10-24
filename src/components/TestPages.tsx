import { clientOnly } from "@solidjs/start";
import { cache, createAsync } from "@solidjs/router";
import { createResource, createReaction, createSignal, For, Suspense } from "solid-js";
import { db } from "~/db/db";

async function insertPage() {
    "use server";
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const res = await db()
        .insertInto("pages")
        .values({
            title: "Hello, World!",
            body: "This is the first page.",
        })
        .execute();
    return res.length;
}

const getPages = async () => {
    "use server";
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return db().selectFrom("pages").selectAll().execute();
};

export const TestPages = () => {
    const [data, { refetch, mutate }] = createResource(getPages);
    return (
        <Suspense fallback={<div>Loading1...</div>}>
            <div>
                {/* {fooData.loading && <div>Loading foo...</div>} */}
                <button
                    onClick={async () => {
                        await insertPage();
                        await refetch();
                    }}
                >
                    Insert Page
                </button>
                {data.loading && <div>Loading2...</div>}

                <div class="pages">
                    <For each={data.latest}>
                        {(page) => (
                            <div>
                                {page.title} {page.createdAt.toString()}
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </Suspense>
    );
};
