import WorkshopsList from "./WorkshopsList";
import { render, screen } from '@testing-library/react';

describe( 'WorkshopsList on load', () => {
    test( 'should show the spinner', () => {
        render(
            <WorkshopsList />
        );

        const loadingSpinner = screen.getByTestId( 'loading-spinner' );
        
        // Jest matchers - https://jestjs.io/docs/expect

        expect( loadingSpinner ).toBeInTheDocument();
    });
});