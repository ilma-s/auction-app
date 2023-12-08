export const BACKEND_URL_STRING = 'http://localhost:8080';

export const EVENT_KEY_STRING = 'Enter';

export const APP_NAME_STRING = 'AUCTION';

export const SEARCH_PLACEHOLDER_STRING = 'Shoes';

export const HOME_STRING = 'HOME';

export const SHOP_STRING = 'SHOP';

export const MY_ACCOUNT_STRING = 'MY ACCOUNT';

export const ABOUT_US_STRING = 'About Us';

export const TERMS_AND_CONDITIONS_STRING = 'Terms and Conditions';

export const PRIVACY_AND_POLICY_STRING = 'Privacy and Policy';

export const GET_IN_TOUCH_STRING = 'GET IN TOUCH';

export const CONTACT_EMAIL_STRING = 'support@auction.com';

export const CONTACT_NUMBER_STRING = '+123-797-567-2535';

export const CATEGORIES_STRING = 'CATEGORIES';

export const ALL_CATEGORIES_STRING = 'All Categories';

export const BID_NOW_STRING = 'BID NOW';

export const NEW_ARRIVALS_STRING = 'New Arrivals';

export const NEW_ARRIVALS_URL_STRING = 'new-arrivals';

export const LAST_CHANCE_STRING = 'Last Chance';

export const LAST_CHANCE_URL_STRING = 'last-chance';

export const RELATED_PRODUCTS_STRING = 'Related Products';

export const RELATED_PRODUCTS_URL_STRING = 'related-products';

export const HIGHEST_BID = 'Highest Bid';

export const NUMBER_OF_BIDS = 'Number of Bids';

export const TIME_LEFT = 'Time Left';

export const PLACE_BID = 'PLACE BID';

export const DETAILS_STRING = 'Details';

export const ALL_ITEMS_STRING = 'All Items'

export const PRODUCT_CATEGORIES_STRING = 'PRODUCT CATEGORIES';

export const NOTIFICATION_TYPES = {
    HIGHEST_BIDDER: 'HIGHEST_BIDDER',
    HIGHER_BIDS: 'HIGHER_BIDS',
    OUTBID_COMPETITION: 'OUTBID_COMPETITION',
};

export const NOTIFICATION_MESSAGES = {
    [NOTIFICATION_TYPES.HIGHEST_BIDDER]: 'Congrats! You are the highest bidder.',
    [NOTIFICATION_TYPES.HIGHER_BIDS]: 'There are higher bids than yours. You could give it a second try!',
    [NOTIFICATION_TYPES.OUTBID_COMPETITION]: 'Congratulations! You outbid the competition.',
};

export const NOTIFICATION_STYLES = {
    [NOTIFICATION_TYPES.HIGHEST_BIDDER]: {
        textColor: 'text-green-800',
        bgColor: 'bg-green-100',
    },
    [NOTIFICATION_TYPES.HIGHER_BIDS]: {
        textColor: 'text-orange-600',
        bgColor: 'bg-orange-100',
    },
    [NOTIFICATION_TYPES.OUTBID_COMPETITION]: {
        textColor: 'text-trueIndigo-500',
        bgColor: 'bg-purple-100',
    },
    default: {
        textColor: 'text-black',
        bgColor: 'bg-white',
    },
};

export const SMALL_WORDS: string[] = [
    'and',
    'the',
    'a',
    'an',
    'of',
    'in',
    'on',
    'for',
    'with',
    'to',
];
