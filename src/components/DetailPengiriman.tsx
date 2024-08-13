import useAppContext from "@/hooks/useAppContext";
import WorkerBuilder from "@/worker/workerBuilder";
import getDetailPengirimanWorker from "@/worker/getDetailPengirimanWorker";
import { useEffect, useState, type ReactElement } from "react";
import { BASE_URL } from "@/constanst";
import { toast } from "./ui/use-toast";

export default function DetailPengiriman(): ReactElement {
  const { user } = useAppContext();
  const [noHandphone, setNoHandphone] = useState(0);
  const [address, setAddress] = useState("");

  const getPrevUserDetail = async () => {
    try {
      const worker = WorkerBuilder(getDetailPengirimanWorker);

      worker.postMessage({ BASE_URL });

      worker.onmessage = (event) => {
        const { success, result: response, error } = event.data;
        if (success) {
          if (response.detailPengiriman) {
            setAddress(response.detailPengiriman.alamatLengkap);
            setNoHandphone(response.detailPengiriman.noHandphone);
          }
        } else {
          console.error("Failed to get detail pengiriman:", error);
        }
      };

      worker.onerror = (error) => {
        console.error("Worker error:", error.message);
      };
    } catch (error) {
      console.error("Failed to fetch previous user details:", error);
      toast({
        description: "Failed to fetch previous user details.",
        variant: "destructive",
      });
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
