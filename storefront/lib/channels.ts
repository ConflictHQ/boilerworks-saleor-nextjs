import { DEFAULT_CHANNEL } from "@/lib/constants";

export function getChannel(): string {
  return DEFAULT_CHANNEL;
}

export function getCurrencyForChannel(channel: string): string {
  const channelCurrencies: Record<string, string> = {
    "default-channel": "USD",
  };
  return channelCurrencies[channel] ?? "USD";
}
