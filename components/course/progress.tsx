export default function Progress() {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <h3 className="mr-4 text-3xl font-bold">Progress</h3>
        <p className="text-sm font-bold text-fsGray">19/32</p>
      </div>
      <p className="mb-2 text-xs font-semibold">Keep going and be part of Top 1%</p>
      <div className="mb-4 flex h-2.5 overflow-hidden rounded bg-ctwGreen/40 text-xs">
        <div
          style={{ width: '65%' }}
          className="flex flex-col justify-center whitespace-nowrap bg-ctwGreen text-center text-white shadow-none"
        ></div>
      </div>
    </div>
  );
}

Progress;
