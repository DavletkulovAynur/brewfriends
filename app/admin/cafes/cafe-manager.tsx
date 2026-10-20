"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, MapPin, Pencil, Plus, Trash2, X } from "lucide-react";

type Cafe = {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
};

type CafeForm = Omit<Cafe, "id">;

const emptyForm: CafeForm = { name: "", address: "", lat: 0, lng: 0 };

export function CafeManager() {
    const router = useRouter();
    const [cafes, setCafes] = useState<Cafe[]>([]);
    const [form, setForm] = useState<CafeForm>(emptyForm);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let isActive = true;
        fetch("/api/admin/cafes")
            .then(async (response) => {
                const result = (await response.json()) as { cafes?: Cafe[]; error?: string };
                if (!response.ok) throw new Error(result.error ?? "Не удалось загрузить кафе");
                if (isActive) setCafes(result.cafes ?? []);
            })
            .catch((cause: unknown) => {
                if (isActive) {
                    setError(cause instanceof Error ? cause.message : "Не удалось загрузить кафе");
                }
            })
            .finally(() => {
                if (isActive) setIsLoading(false);
            });

        return () => {
            isActive = false;
        };
    }, []);

    function startEditing(cafe: Cafe) {
        setEditingId(cafe.id);
        setForm({ name: cafe.name, address: cafe.address, lat: cafe.lat, lng: cafe.lng });
        setError("");
    }

    function resetForm() {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
    }

    async function saveCafe(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsSaving(true);

        try {
            const response = await fetch(
                editingId ? `/api/admin/cafes/${editingId}` : "/api/admin/cafes",
                {
                    method: editingId ? "PATCH" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: form.name,
                        address: form.address,
                        lat: Number(form.lat),
                        lng: Number(form.lng),
                    }),
                },
            );
            const result = (await response.json()) as { cafe?: Cafe; error?: string };
            if (!response.ok || !result.cafe) {
                throw new Error(result.error ?? "Не удалось сохранить кафе");
            }

            setCafes((current) =>
                editingId
                    ? current.map((cafe) => (cafe.id === editingId ? result.cafe! : cafe))
                    : [...current, result.cafe!].sort((left, right) =>
                        left.name.localeCompare(right.name, "ru"),
                    ),
            );
            resetForm();
            router.refresh();
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Не удалось сохранить кафе");
        } finally {
            setIsSaving(false);
        }
    }

    async function deleteCafe(cafe: Cafe) {
        if (!window.confirm(`Удалить кафе «${cafe.name}»?`)) return;
        setError("");

        try {
            const response = await fetch(`/api/admin/cafes/${cafe.id}`, { method: "DELETE" });
            const result = (await response.json()) as { error?: string };
            if (!response.ok) throw new Error(result.error ?? "Не удалось удалить кафе");
            setCafes((current) => current.filter((item) => item.id !== cafe.id));
            if (editingId === cafe.id) resetForm();
            router.refresh();
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Не удалось удалить кафе");
        }
    }

    return (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section aria-label="Список кафе" className="min-w-0">
                <div className="flex items-baseline justify-between gap-4 border-b border-stone-300 pb-3">
                    <h2 className="text-lg font-semibold">Кафе</h2>
                    <span className="text-sm tabular-nums text-stone-500">{cafes.length}</span>
                </div>

                {error ? (
                    <p aria-live="polite" className="mt-4 border-l-2 border-red-700 bg-white px-4 py-3 text-sm text-red-800">
                        {error}
                    </p>
                ) : null}

                {isLoading ? (
                    <div className="flex items-center gap-2 py-10 text-sm text-stone-500">
                        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                        Загружаем кафе...
                    </div>
                ) : cafes.length === 0 ? (
                    <p className="py-10 text-sm text-stone-500">Пока кафе не добавлены.</p>
                ) : (
                    <ul className="divide-y divide-stone-200">
                        {cafes.map((cafe) => (
                            <li key={cafe.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-medium text-stone-900">{cafe.name}</h3>
                                    <p className="mt-1 text-sm text-stone-600">{cafe.address}</p>
                                    <p className="mt-2 flex items-center gap-1.5 text-xs tabular-nums text-stone-500">
                                        <MapPin aria-hidden="true" className="size-3.5" />
                                        {cafe.lat}, {cafe.lng}
                                    </p>
                                </div>
                                <div className="flex shrink-0 gap-2">
                                    <button
                                        aria-label={`Изменить ${cafe.name}`}
                                        className="inline-flex size-9 items-center justify-center rounded-md border border-stone-300 text-stone-700 transition hover:bg-white"
                                        onClick={() => startEditing(cafe)}
                                        title="Изменить"
                                        type="button"
                                    >
                                        <Pencil aria-hidden="true" className="size-4" />
                                    </button>
                                    <button
                                        aria-label={`Удалить ${cafe.name}`}
                                        className="inline-flex size-9 items-center justify-center rounded-md border border-stone-300 text-red-700 transition hover:bg-red-50"
                                        onClick={() => deleteCafe(cafe)}
                                        title="Удалить"
                                        type="button"
                                    >
                                        <Trash2 aria-hidden="true" className="size-4" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className="border border-stone-200 bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-base font-semibold">
                        {editingId ? "Изменить кафе" : "Добавить кафе"}
                    </h2>
                    {editingId ? (
                        <button
                            aria-label="Отменить редактирование"
                            className="inline-flex size-8 items-center justify-center rounded-md text-stone-500 hover:bg-stone-100"
                            onClick={resetForm}
                            title="Отменить"
                            type="button"
                        >
                            <X aria-hidden="true" className="size-4" />
                        </button>
                    ) : null}
                </div>
                <form className="mt-5 space-y-4" onSubmit={saveCafe}>
                    <label className="block space-y-1.5 text-sm font-medium text-stone-700">
                        Название
                        <input
                            className="h-10 w-full rounded-md border border-stone-300 px-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                            maxLength={160}
                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                            required
                            value={form.name}
                        />
                    </label>
                    <label className="block space-y-1.5 text-sm font-medium text-stone-700">
                        Адрес
                        <input
                            className="h-10 w-full rounded-md border border-stone-300 px-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                            maxLength={500}
                            onChange={(event) => setForm({ ...form, address: event.target.value })}
                            required
                            value={form.address}
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="block space-y-1.5 text-sm font-medium text-stone-700">
                            Широта
                            <input
                                className="h-10 w-full rounded-md border border-stone-300 px-3 tabular-nums outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                                max={90}
                                min={-90}
                                onChange={(event) => setForm({ ...form, lat: Number(event.target.value) })}
                                required
                                step="any"
                                type="number"
                                value={form.lat}
                            />
                        </label>
                        <label className="block space-y-1.5 text-sm font-medium text-stone-700">
                            Долгота
                            <input
                                className="h-10 w-full rounded-md border border-stone-300 px-3 tabular-nums outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                                max={180}
                                min={-180}
                                onChange={(event) => setForm({ ...form, lng: Number(event.target.value) })}
                                required
                                step="any"
                                type="number"
                                value={form.lng}
                            />
                        </label>
                    </div>
                    <button
                        className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-emerald-800 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:opacity-60"
                        disabled={isSaving}
                        type="submit"
                    >
                        {isSaving ? (
                            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                        ) : editingId ? (
                            <Pencil aria-hidden="true" className="size-4" />
                        ) : (
                            <Plus aria-hidden="true" className="size-4" />
                        )}
                        {isSaving ? "Сохраняем..." : editingId ? "Сохранить" : "Добавить кафе"}
                    </button>
                </form>
            </section>
        </div>
    );
}