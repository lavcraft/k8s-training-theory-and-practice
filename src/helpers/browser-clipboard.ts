export async function copyToClipboard(data: string) {
    if (typeof navigator === 'undefined') {
        return
    }

    // @ts-ignore
    const result = await navigator.permissions.query(
        // @ts-ignore
        {name: "clipboard-write"}
    );

    if (result.state === "granted" || result.state === "prompt") {
        /* write to the clipboard now */
        await navigator.clipboard.writeText(data);
    }

}