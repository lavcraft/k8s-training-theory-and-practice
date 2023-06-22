export async function copyToClipboard(data: string) {
    if (typeof navigator === 'undefined') {
        return
    }

    await navigator.permissions.query(<PermissionDescriptor>{name: "clipboard-write"}).then(async (result) => {

        if (result.state === "granted" || result.state === "prompt") {
            /* write to the clipboard now */
            await navigator.clipboard.writeText(data);
        }
    });

}