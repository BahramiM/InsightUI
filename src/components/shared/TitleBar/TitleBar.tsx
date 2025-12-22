import { Typography } from "@/components/ui";

type Props = {
  title: string;
  subTitle?: string;
};

const TitleBar = ({ title, subTitle }: Props) => {
  return (
    <div className="my-8 border-b-1 border-gray-200 dark:border-gray-700 pb-4">
      <Typography className="text-2xl font-bold " as="h1">
        {title}
      </Typography>
      {subTitle ? (
        <Typography
          as="small"
          className="text-gray-500 text-sm flex justify-between"
        >
          {subTitle}
        </Typography>
      ) : null}
    </div>
  );
};

export default TitleBar;
