import { fetchData } from '../../helpers/apiFunctions';
import { BidInformation, Product } from '../../types';

class BidUtils {
    static async getBidInformation(productId: string): Promise<BidInformation> {
        const data = await fetchData(`bid-info?product_id=${productId}`);
        data.timeLeft = BidUtils.convertTimeLeft(data.timeLeft) as string;
        return data;
    }

    static convertTimeLeft(timeLeft: string): string {
        const timeParts = timeLeft.split(', ');
        const [daysPart, hoursPart] = timeParts[1].split(':');

        if (timeParts[0].includes('day')) {
            const days = parseInt(timeParts[0], 10);
            if (days >= 7) {
                const weeks = Math.floor(days / 7);
                const remainingDays = days % 7;
                return `${weeks} weeks, ${remainingDays} days`;
            }
            return `${days} days`;
        } else {
            const [hours, minutes, seconds] = hoursPart.split(':').map(Number);
            if (hours > 0) {
                return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
            }
            if (minutes > 0) {
                return `${minutes} minutes, ${seconds} seconds`;
            }
            return `${seconds} seconds`;
        }
    }

    static getNextBidValue(
        bidInformation: BidInformation,
        product: Product,
    ): string {
        const price =
            bidInformation.numberOfBids === 0
                ? product?.startingPrice + 1
                : bidInformation.highestBid + 1;

        return `Enter $${price} or higher`;
    }
}

export default BidUtils;
