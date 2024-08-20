import * as React from 'react';
import { Alert, ScrollView, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Label } from '~/components/ui/label';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { cn } from '~/lib/utils';
import { FlashList } from '@shopify/flash-list';

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

  const INVOICES = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
  ];
  
  const MIN_COLUMN_WIDTHS = [120, 120, 100, 120];

export default function Screen() {

    const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);


  const [value, setValue] = React.useState('account');
  return (
    <View className='flex-1 justify-center p-6'>
      <Tabs
        value={value}
        onValueChange={setValue}
        className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full'>
          <TabsTrigger value='account' className='flex-1'>
            <Text>Account</Text>
          </TabsTrigger>
          <TabsTrigger value='password' className='flex-1'>
            <Text>Password</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <Card>
            <CardContent className='gap-4 native:gap-2'>
            <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
        <Table aria-labelledby='invoice-table'>
          <TableHeader>
            <TableRow>
              <TableHead className='px-0.5' style={{ width: columnWidths[0] }}>
                <Text>Invoice</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[1] }}>
                <Text>Status</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[2] }}>
                <Text>Method</Text>
              </TableHead>
              <TableHead style={{ width: columnWidths[3] }}>
                <Text className='text-center md:text-right md:pr-5'>Amount</Text>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <FlashList
              data={INVOICES}
              estimatedItemSize={45}
              contentContainerStyle={{
                paddingBottom: insets.bottom,
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: invoice, index }) => {
                return (
                  <TableRow
                    key={invoice.invoice}
                    className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                  >
                    <TableCell style={{ width: columnWidths[0] }}>
                      <Text>{invoice.invoice}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[1] }}>
                      <Text>{invoice.paymentStatus}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[2] }}>
                      <Text>{invoice.paymentMethod}</Text>
                    </TableCell>
                    <TableCell style={{ width: columnWidths[3] }} className='items-end '>
                      <Button
                        variant='secondary'
                        size='sm'
                        className='shadow-sm shadow-foreground/10 mr-3'
                        onPress={() => {
                          Alert.alert(
                            invoice.totalAmount,
                            `You pressed the price button on invoice ${invoice.invoice}.`
                          );
                        }}
                      >
                        <Text>{invoice.totalAmount}</Text>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }}
              ListFooterComponent={() => {
                return (
                  <>
                    <TableFooter>
                      <TableRow>
                        <TableCell className='flex-1 justify-center'>
                          <Text className='text-foreground'>Total</Text>
                        </TableCell>
                        <TableCell className='items-end pr-8'>
                          <Button
                            size='sm'
                            variant='ghost'
                            onPress={() => {
                              Alert.alert(
                                'Total Amount',
                                `You pressed the total amount price button.`
                              );
                            }}
                          >
                            <Text>$2,500.00</Text>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                    <View className='items-center py-3 ios:pb-0'>
                      <Text
                        nativeID='invoice-table'
                        className='items-center text-sm text-muted-foreground'
                      >
                        A list of your recent invoices.
                      </Text>
                    </View>
                  </>
                );
              }}
            />
          </TableBody>
        </Table>
      </ScrollView>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='password'>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-4 native:gap-2'>
              <View className='gap-1'>
                <Label nativeID='current'>Current password</Label>
              </View>
              <View className='gap-1'>
                <Label nativeID='new'>New password</Label>
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Save password</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}
