import WorkshopsList from "./WorkshopsList";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import workshops from '../../../mocks/data/workshops';
import server from '../../../mocks/server';
import { errorHandlers } from '../../../mocks/handlers';
import userEvent from '@testing-library/user-event';

describe( 'WorkshopsList on load', () => {
    test( 'should show the spinner', () => {
        render(
            <BrowserRouter>
                <WorkshopsList />
            </BrowserRouter>
        );

        const loadingSpinner = screen.getByTestId( 'loading-spinner' );
        
        // Jest matchers - https://jestjs.io/docs/expect

        expect( loadingSpinner ).toBeInTheDocument();
    });

    test( 'should fetch the workshops from the backend and render in a list', async () => {
        render(
            <BrowserRouter>
                <WorkshopsList />
            </BrowserRouter>
        );

        // the name of every workshop on the first page should appear
        for( let i = 0; i < 10; i++ ) {
            // use findBy*() methods to query for elements that apear after a small delay (asynchronously)
            const workshopName = await screen.findByText( workshops[i].name );
            expect( workshopName ).toBeInTheDocument();
        }
    });

    test( 'should try fetch the workshops from the backend and an error message on failure', async () => {
        server.use( ...errorHandlers );

        render(
            <BrowserRouter>
                <WorkshopsList />
            </BrowserRouter>
        );

        const errorMessage = await screen.findByTestId( 'error-message' );

        expect( errorMessage ).toBeInTheDocument();
    });
});

describe( 'WorkshopsList Pagination', () => {
    test( 'should work on click of next button (navigates to the next page)', async () => {
        render(
            <BrowserRouter>
                <WorkshopsList />
            </BrowserRouter>
        );

        const nextButton = screen.getByRole( 'button', { name : 'Next' } );
        userEvent.click( nextButton );

        for( let i = 10; i < 12; i++ ) {
            const workshopName = await screen.findByText( workshops[i].name );
            expect( workshopName ).toBeInTheDocument();
        }
    });
});