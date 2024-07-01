import { type ReactElement } from "react";

export interface DetailPengirimanProps {}

const detailData = [
  { label: "Nama", value: "Rendi Virgantara Setiawan" },
  { label: "No Handphone", value: "08123456789" },
  { label: "Alamat", value: "Jl Raya Indonesia no 14" },
];

export default function DetailPengiriman(props: DetailPengirimanProps): ReactElement {
  return (
    <>
      <h2 className="mb-6">Detail Pengiriman</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          {detailData.map((detail, index) => (
            <label key={index} className="grid grid-cols-detail">
              <span className="font-medium text-muted-foreground">{detail.label}</span>
              <p className="mt-0">: {detail.value}</p>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
