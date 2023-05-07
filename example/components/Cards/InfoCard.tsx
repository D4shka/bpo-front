import { ReactSVGElement } from "react";
import { Card, CardBody } from "@roketid/windmill-react-ui";

interface IInfoCard {
  title: string;
  value: string;
  children?: ReactSVGElement;
}

function InfoCard({ title, value, children }: IInfoCard) {
  return (
    <Card>
      <CardBody className="flex items-center">
        {children}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 ">{title}</p>
          <p className="text-lg font-sans text-gray-700">{value}</p>
        </div>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
