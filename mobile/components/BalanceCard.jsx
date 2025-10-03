import { View, Text } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useEffect } from "react";

export const BalanceCard = ({ summary }) => {
  return (
    <Animated.View 
      entering={FadeInDown.duration(600).springify()}
      style={styles.balanceCard}
    >
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Animated.Text 
        entering={FadeIn.delay(200).duration(400)}
        style={styles.balanceAmount}
      >
        ${parseFloat(summary.balance).toFixed(2)}
      </Animated.Text>
      <View style={styles.balanceStats}>
        <Animated.View 
          entering={FadeIn.delay(300).duration(400)}
          style={styles.balanceStatItem}
        >
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
            +${parseFloat(summary.income).toFixed(2)}
          </Text>
        </Animated.View>
        <View style={[styles.balanceStatItem, styles.statDivider]} />
        <Animated.View 
          entering={FadeIn.delay(400).duration(400)}
          style={styles.balanceStatItem}
        >
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
            -${Math.abs(parseFloat(summary.expenses)).toFixed(2)}
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};
