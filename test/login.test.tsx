import {expect} from 'detox';

describe('FirstTest', () => {
    beforeAll(async () => {
        await device.launchApp();
        //debugger;
    })
  
    beforeEach(async () => {
        await device.launchApp({ newInstance: true });
       //await device.reloadReactNative(); // Faster but can cause bugs
    });
      
      

    it('should login', async () => {
        const email: string = 'test@example.com';
        const password: string = 'password123';

        
        detox.log.info('Trying to log in...');

        //need to add the testID to the elements
        await element(by.name('emailInput')).typeText(email);
        await element(by.name('passwordInput')).typeText(password);
        await element(by.name('loginButton')).tap();



        await expect(element(by.text('Button Tapped'))).toBeVisible();
      });

    it('should go to add and interact', async () => {


        //need to add the testID to the elements
        await element(by.name('add')).tap();
        //add test on the add page 



        await expect(element(by.text('Button Tapped'))).toBeVisible();
    });

    it('should go from home to explore', async () => {


        //need to add the testID to the elements
        await element(by.id('explore')).tap();



        await expect(element(by.text('Information'))).toBeVisible();
      });
    
    it('should go from home to explore', async () => {


        //need to add the testID to the elements
        await element(by.id('home')).tap();



        await expect(element(by.text('Information'))).toBeVisible();
    });

    
  })


