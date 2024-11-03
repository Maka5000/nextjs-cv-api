export default function InfoChip({
  imageURL,
  count,
  chipTitle,
}: Readonly<{ imageURL: string; count: string | number; chipTitle: string }>) {
  return (
    <div className="flex flex-col align-middle items-center border-2 px-5 py-2 rounded-lg">
      <img src={imageURL} className="max-w-12" alt={chipTitle} />
      <p className="font-bold text-2xl">{chipTitle}</p>
      <p>{count}</p>
    </div>
  );
}
