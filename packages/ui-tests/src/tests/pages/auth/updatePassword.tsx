import React, { FC } from "react";

import { render, TestWrapper } from "@test";
import { UpdatePasswordPageProps } from "@refinedev/core";

export const pageUpdatePasswordTests = function (
    UpdatePasswordPage: FC<UpdatePasswordPageProps<any, any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Update Password Page", () => {
        it("should render card title", async () => {
            const { getByText } = render(<UpdatePasswordPage />, {
                wrapper: TestWrapper({}),
            });

            expect(getByText(/set new password?/i)).toBeInTheDocument();
        });

        it("should render password input", async () => {
            const { getByLabelText } = render(<UpdatePasswordPage />, {
                wrapper: TestWrapper({}),
            });

            expect(getByLabelText("New Password")).toBeInTheDocument();
            expect(getByLabelText("Confirm New Password")).toBeInTheDocument();
        });

        it("should render default <ThemedTitle> with icon", async () => {
            const { getByText, getByTestId } = render(<UpdatePasswordPage />, {
                wrapper: TestWrapper({}),
            });

            expect(getByText(/refine project/i)).toBeInTheDocument();
            expect(getByTestId("refine-logo")).toBeInTheDocument();
        });

        it("should render custom title", async () => {
            const { queryByText, queryByTestId } = render(
                <UpdatePasswordPage title="Custom Title" />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(queryByText(/custom title/i)).toBeInTheDocument();
            expect(queryByText(/refine project/i)).not.toBeInTheDocument();
            expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
        });

        it("should renderContent only", async () => {
            const { queryByText, queryByTestId, queryByLabelText } = render(
                <UpdatePasswordPage
                    renderContent={() => <div data-testid="custom-content" />}
                />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(queryByText(/refine project/i)).not.toBeInTheDocument();
            expect(queryByTestId("refine-logo")).not.toBeInTheDocument();
            expect(queryByLabelText("New Password")).not.toBeInTheDocument();
            expect(
                queryByLabelText("Confirm New Password"),
            ).not.toBeInTheDocument();
            expect(queryByTestId("custom-content")).toBeInTheDocument();
        });

        it("should customizable with renderContent", async () => {
            const { queryByText, queryByTestId, getByLabelText } = render(
                <UpdatePasswordPage
                    renderContent={(content: any, title: any) => (
                        <div>
                            {title}
                            <div data-testid="custom-content">
                                <div>Custom Content</div>
                            </div>
                            {content}
                        </div>
                    )}
                />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(queryByText(/custom content/i)).toBeInTheDocument();
            expect(queryByTestId("custom-content")).toBeInTheDocument();
            expect(queryByText(/refine project/i)).toBeInTheDocument();
            expect(queryByTestId("refine-logo")).toBeInTheDocument();
            expect(queryByTestId("custom-content")).toBeInTheDocument();
            expect(getByLabelText("New Password")).toBeInTheDocument();
            expect(getByLabelText("Confirm New Password")).toBeInTheDocument();
        });
    });
};
