import type { Folder } from "@/app/_lib/mock-data";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  return (
    <form className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
          링크 주소
        </label>
        <input
          id="url"
          name="url"
          type="url"
          placeholder="https://example.com"
          className="input-field rounded-md px-3 py-2 text-base"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="folderId"
          className="text-sm font-medium text-[var(--text)]"
        >
          폴더
        </label>
        <select
          id="folderId"
          name="folderId"
          className="input-field rounded-md px-3 py-2 text-base"
        >
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="btn-primary mt-2 self-start rounded-md px-4 py-2 text-sm font-medium"
      >
        저장
      </button>
    </form>
  );
}
