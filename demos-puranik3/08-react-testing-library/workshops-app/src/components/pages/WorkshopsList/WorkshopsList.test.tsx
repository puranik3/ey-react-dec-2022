import WorkshopsList from "./WorkshopsList";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import workshops from '../../../mocks/data/workshops';

describe( 'WorkshopsList on load', () => {
    test( 'should show the spinner', () => {
        render(
            <WorkshopsList />
        );

        const loadingSpinner = screen.getByTestId( 'loading-spinner' );
        
        // Jest matchers - https://jestjs.io/docs/expect

        expect( loadingSpinner ).toBeInTheDocument();
    });

    test( 'fetch the workshops from the backend and render in a list', async () => {
        render(
            <BrowserRouter>
                <WorkshopsList />
            </BrowserRouter>
        );

        for( let i = 0; i < 10; i++ ) {
            // use findBy*() methods to query for elements that apear after a small delay (asynchronously)
            const workshopName = await screen.findByText( workshops[i].name );
            expect( workshopName ).toBeInTheDocument();
        }
    });
});