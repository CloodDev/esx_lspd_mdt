export async function fetchNui<T>(url: string, data: T): Promise<any> {
  try {
    const resp = await fetch(`https://esx_lspd_mdt/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${(await resp).status}`);
    }
  } catch (error) {}
}
