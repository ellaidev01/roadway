import React from "react";
import { Button, Card } from "antd";

type PackageCardProps = {
  item: {
    id: number;
    heading: string;
    content1: string;
    content2: string;
    content3?: string;
    price?: number | undefined;
    btnName: string;
  };

  handleSelectPackage: () => void ;
  selectedVechicleIds: number[];
  handleSubscription: () => void
}

const PackageCard: React.FC<PackageCardProps> = ({
  item,
  selectedVechicleIds,
  handleSelectPackage,
  handleSubscription
}) => {

  console.log(selectedVechicleIds);
  
  return (
    <div>
      <Card
        className="border-2 md:mt-10 mt-4  border-cyan-100 flex flex-col justify-between mb-3 text-center mx-2 w-[270px] md:w-[250px] h-[185px] font-semibold bg-green-50"
        key={item?.id}
      >
        <div className="flex flex-col justify-between  h-full">
          <div>
            <p className="card-header text-2xl font-extrabold mb-4 text-cyan-700">
              {item?.heading}
            </p>

            <div className="card-content mb-4">
              <p>Total Vehicles Selected: {selectedVechicleIds?.length}</p>
              {/* <p>{item?.content2}</p> */}
              {/* <p className="font-bold  text-cyan-700">{item?.content2}</p> */}
              {/* <p className="font-bold  text-cyan-700">Rs: {item?.price}{item?.heading ==="One month Subscription" ? "/month":"/year" }</p> */}
            </div>
          </div>

          <div className="card-footer absolute bottom-0 left-0 right-0 p-4">
            <Button
              className="mt-10 text-white border-none flex justify-center items-center w-full font-semibold color-btn"
              onClick={() => {
                handleSelectPackage();
                handleSubscription();
              }}
            >
              {item.btnName}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PackageCard;
