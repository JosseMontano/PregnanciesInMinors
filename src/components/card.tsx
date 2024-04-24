type Params = {
  Icon: () => JSX.Element;
  title: string;
  subtitle: string;
  description: any;
  bgColor: string;
titleColor: string;
};

const Card = ({ description, Icon, subtitle, title, bgColor, titleColor }: Params) => {

  return (
    <div className="w-72 h-auto bg-primary shadow-md rounded-lg p-5 flex flex-col items-center space-y-4">
      <div className={`rounded-full p-3 ${bgColor}`}>
        <Icon />
      </div>
      <h2 className={`text-xl font-semibold ${titleColor}`}>{title}</h2>
      <h3 className="text-lg text-gray-300">{subtitle}</h3>
      <p className="text-gray-200 text-center">
        {description} 
      </p>
    </div>
  );
};

export default Card;
