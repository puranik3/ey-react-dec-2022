import WorkshopsList from "./WorkshopsList";
import { render } from '@testing-library/react';

describe( 'WorkshopsList on load', () => {
    test( 'should show the spinner', () => {
        render(
            <WorkshopsList />
        )
    });
});