import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

const NoTransactionsFound = () => {
  const router = useRouter();

  return (
    <Animated.View 
      entering={FadeInDown.duration(500).springify()}
      style={styles.emptyState}
    >
      <Animated.View entering={FadeIn.delay(200).duration(400)}>
        <Ionicons
          name="receipt-outline"
          size={60}
          color={COLORS.textLight}
          style={styles.emptyStateIcon}
        />
      </Animated.View>
      <Animated.Text 
        entering={FadeIn.delay(300).duration(400)}
        style={styles.emptyStateTitle}
      >
        No transactions yet
      </Animated.Text>
      <Animated.Text 
        entering={FadeIn.delay(400).duration(400)}
        style={styles.emptyStateText}
      >
        Start tracking your finances by adding your first transaction
      </Animated.Text>
      <Animated.View entering={FadeIn.delay(500).duration(400)}>
        <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push("/create")}>
          <Ionicons name="add-circle" size={18} color={COLORS.white} />
          <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
export default NoTransactionsFound;
