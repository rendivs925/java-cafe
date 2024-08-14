import useAppContext from "@/hooks/useAppContext";
import { useEffect, useState, type ReactElement } from "react";
import { getUserDetailAction } from "@/actions/getUserDetailAction";

export default function DetailPengiriman(): ReactElement {
  const { user } = useAppContext();
  const [noHandphone, setNoHandphone] = useState(0);
  const [address, setAddress] = useState("");

  const getPrevUserDetail = async () => {
    const response = await getUserDetailAction();

    if (response.status === "success" && response.detailPengiriman) {
      setAddress(response.detailPengiriman.alamatLengkap);
      setNoHandphone(response.detailPengiriman.noHandphone);
    }
  };

  useEffect(() => {
    getPrevUserDetail();
  }, []);

  const detailData = [
    { label: "Nama", value: user.username },
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
                (detail.value === 0 || detail.value === "") && "hidden"
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
