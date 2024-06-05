import { TypePregnancies } from "../interfaces/typePregnancies";
import StadisticIcon from "../icons/stadistic";
import NaturalIcon from "../icons/natural";
import DataIcon from "../icons/data";

export const handletypePregnancies= (item: TypePregnancies)=>{
    switch (item.Tipo_embarazo) {
        case "Accidente":
          item.Icon = DataIcon;
          item.bgColor = "bg-secondary_child";
          item.Title = "text-secondary";
          item.subtitle = "text-secondary_child";
          item.description = "Mujeres, quedaron embarazadas por accidente";
          break;
        case "Planificado":
          item.Icon = NaturalIcon;
          item.bgColor = "bg-quaternary";
          item.Title = "text-quaternary";
          item.subtitle = "text-quaternary_child";
          item.description =
            "Mujeres, quedaron embarazadas habiendo planificado";
          break;
        case "Violación":
          item.Icon = StadisticIcon;
          item.bgColor = "bg-thertiary_child";
          item.Title = "text-thertiary";
          item.subtitle = "text-thertiary_child";
          item.description = "Mujeres, quedaron embarazadas por violación";
          break;
        default:
          item.Icon = NaturalIcon;
          break;
      }
      return item;
}