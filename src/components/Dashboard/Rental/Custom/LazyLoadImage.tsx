import { Skeleton } from "antd";
import { ReactNode, Suspense } from "react";

type LazyLoadProps = {
  children: ReactNode;
}

const LazyLoadImage: React.FC<LazyLoadProps> = ({ children }) => {
  return (
    <div>
      <Suspense
        fallback={
          <div>
            <Skeleton />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default LazyLoadImage;
