import useAppContext from "@/hooks/useAppContext";

export default function DetailPengiriman() {
  const { detailPengiriman } = useAppContext();
  const address = detailPengiriman?.alamatLengkap;
  const noHandphone = detailPengiriman?.noHandphone;
  const username = detailPengiriman?.username;

  const detailData = [
    { label: "Nama", value: username },
    { label: "No Handphone", value: noHandphone },
    { label: "Alamat", value: address },
  ];

  return (
    <>
      <h2 className="mb-6">Detail Pengiriman</h2>
      <div>
        <div className="space-y-2">
          {detailData.map((detail, index) => (
            <label
              key={index}
              className={`grid grid-cols-detail sm:grid-cols-sm-detail ${
                detail.value === "" && "hidden"
              }`}
            >
              <span className="font-medium text-muted-foreground">
                {detail.label}
              </span>
              <p className="mt-0">: {detail.value}</p>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
