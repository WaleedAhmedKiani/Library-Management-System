import LibraryCardDoas, { LibraryCardModel } from "../daos/LibraryCardDoas";
import { libraryCard } from "../models/LibraryCard";
import { LibraryCardDoesNotExistError } from "../utils/LibraryError";


export const RegisterLibraryCard = async (Card: libraryCard): Promise<LibraryCardModel> => {

    try {
        const newCard = new LibraryCardDoas(Card);
        return await newCard.save();
    } catch (error: any) {
        let c = await LibraryCardDoas.findOne({ user: Card.user }).populate('user');
        if (c) {
            return c;
        } else {
            throw new Error(error);
        }
    }
};

export const getLibraryCardByCardId = async (CardId: string): Promise<LibraryCardModel | null > => {
    try {
        let card = await LibraryCardDoas.findOne({ _id: CardId }).populate('user');
        if (card) {
            return card;
        } else {
            throw new LibraryCardDoesNotExistError("Card not found");
        }

    } catch (error) {
        throw error;
    }
};
