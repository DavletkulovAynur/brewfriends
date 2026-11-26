import { PeopleIdeaForm } from "./people-idea-form";

export default function PeoplePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 p-6">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Что будет в разделе «Люди»?</h1>
        <p className="text-muted-foreground">
          Мы пока решаем, каким сделать этот раздел. Здесь можно будет искать
          компанию на события, знакомиться по интересам или находить места для
          встреч. А может, у вас есть идея получше. Напишите, что было бы полезно
          именно вам — мы обязательно её прочитаем.
        </p>
      </header>
      <PeopleIdeaForm />
    </div>
  );
}
