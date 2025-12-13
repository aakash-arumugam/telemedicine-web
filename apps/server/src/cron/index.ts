import cron from "node-cron";
import User from "@modules/user/user.model";
import { fetchNewEmails } from "@modules/gmail/gmail.services";
import { emailCronLogger } from "@utils/logger";

export const syncEmailsCron = async () => {

    emailCronLogger.info("Setting up sync emails cron");

    cron.schedule("*/5 * * * *", async () => {

        emailCronLogger.info(`Cron:: Syncing email ${new Date().toISOString()}`)

        const users = await User.find({ refreshToken: { $ne: null } });

        emailCronLogger.info(`Cron:: Found ${users.length} users`)

        for (const user of users) {
            try {
                emailCronLogger.info(`Cron:: Syncing email for user ${user._id}`)
                const { messages } = await fetchNewEmails(user._id.toString());

                emailCronLogger.info(`Cron:: Synced email for user ${user._id}`)
            } catch (error) {
                emailCronLogger.error(`Error syncing emails for user ${user._id}:`, error);
            }
        }
    })
}