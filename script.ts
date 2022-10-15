const url: string = "https://api.thecatapi.com/v1/images/search";
const button: HTMLButtonElement | null = document.querySelector("button")
const tableBody: HTMLTableElement | null = document.querySelector("#table-body")

interface CatType {
    id: string;
    url: string;
    height: number;
    width: number;
    test?: boolean;
}

class Cat implements CatType {
    id: string;
    url: string;
    height: number;
    width: number;

    constructor(id: string, url: string, height: number, width: number) {
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}

class WebDisplay {
    public static addData(data: CatType): void {
        const cat: Cat = new Cat(data.id, data.url, data.height, data.width)
        const tableRow: HTMLTableRowElement = document.createElement("tr")
        tableRow.innerHTML = `
                    <td>${cat.id}</td>
                    <td><img src=${cat.url} alt=""></td>
                    <td>${cat.height.toString()}/td>
                    <td>${cat.width.toString()}</td>
                    <td>${cat.url}</td>
                    <td><a href="#">删除</a></td>
        `
        tableBody?.appendChild(tableRow)
    }
    public static deleteData(deleteButton: HTMLAnchorElement): void {
        const td = deleteButton.parentElement as HTMLTableCellElement
        const tr = td.parentElement as HTMLTableRowElement
        tr.remove()
    }
}
async function getJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const json: Promise<T> = await response.json();
    return json;
}

async function getData() {
    try {
        const json: CatType[] = await getJson<CatType[]>(url);
        const data = json[0];
        WebDisplay.addData(data);

    }
    catch (error) {
        let message: string;
        if (error instanceof Error) {
            message = error.message
        } else {
            message = String(error)
        }
        console.log(error)
    }
}

button?.addEventListener<"click">("click", getData)

tableBody?.addEventListener<"click">("click", (ev: MouseEvent) => {
    if (ev.target instanceof HTMLAnchorElement) {
        WebDisplay.deleteData(ev.target as HTMLAnchorElement)
    }
})



