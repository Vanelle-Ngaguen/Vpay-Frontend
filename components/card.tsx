import { Card as CardInterface } from "@/types";
import { LinearGradient } from "expo-linear-gradient"; // Assuming you have a linear gradient component
import { Text, View } from "react-native";

interface Props {
    card: CardInterface
}

const Card = ({card}: Props) => {
  const formattedDate = () => {
    const date = new Date(card.expiry_date);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    return `${month}/${year}`;
  }
  return (
    <LinearGradient colors={["#000000", "#9664c4", "#a97bcc"]} locations={[0, 0.85, 1]} start={{y:1, x:0 }} end={{ x:1, y:0 }} style={{ padding: 20, borderRadius: 10, marginBlockEnd: 20, aspectRatio: 16/9, height: 170 }}>
       <Text
  style={{
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    textTransform: 'uppercase',
  }}
>
  {card.holder_name}
</Text>



      

<Text
  style={{
    color: "#fff",
    fontSize: 18,
    textAlign: 'right',
    width: '100%', // makes sure the Text has enough space to align right
  }}
>
  $ {card.balance}
</Text>


<Text
  style={{
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "left",
    letterSpacing: 2,
    paddingBottom: 15, // Adds some space below the card number
  }}
>
  {(card.number?.toString().replace(/(.{4})/g, '$1 ').trim()) || '**** **** **** ****'}
</Text>
<Text style={{ color: "#fff", fontSize: 12 }}>
    Expiry date
  </Text>
        
       
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // This is the key change
    gap: 8 // You might not need gap if using space-between, but keeping it won't hurt
}}>
    <Text style={{ color: "#fff", fontSize: 16, fontWeight: 'bold' }}>
        {formattedDate()}
    </Text>

    <Text style={{ color: "#fff", fontSize: 15, fontWeight: 'bold' }}>
        {card.issuer}
    </Text>
</View>

    </LinearGradient>
  );
};

export default Card;
