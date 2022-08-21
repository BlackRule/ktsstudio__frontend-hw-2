type CardProps = {
    image: string; //consider renaming it to url
    title: React.ReactNode;
    subtitle: React.ReactNode;
    content?: React.ReactNode;
    onClick?: React.MouseEventHandler;
};
export const Card = ({image,title,subtitle,content,onClick}:CardProps) => {
    return (<div className="card" onClick={onClick}>
        <div>{title}</div>
        <img src={image}/>
        <div>{subtitle}</div>
        <div>{content}</div>
    </div>);
};